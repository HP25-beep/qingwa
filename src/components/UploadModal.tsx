"use client";

import uniqid from "uniqid"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import useUserFS from "@/hooks/useUserFS"

import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"

const UploadModal = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [uploadType, setUploadType] = useState<number>(0)
  const uploadModal = useUploadModal()

  
  const supabase = createClient()
  const { user } = useUser()
  const { parentId } = useUserFS()

  if (!user) {
    uploadModal.onClose()
  }

  const {
    register, 
    handleSubmit,
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      type: null, 
      parent_id: parentId, 
      target_id: null, 
      name: null, 
      owner_id: '', 
      file_type: '', 
      file: null,
      detail: null, 
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const storageFile = values.file?.[0]

      if (
        (values.type == 0 || !values.name || !values.owner_id || !storageFile || !user) || 
        (values.type == 1 || !values.name || !values.detail || !values.owner_id || !storageFile || !user)
      ) {
        toast.error('Missing fields')
        return
      }

      const uniqueID = uniqid()

      const storageArray = ['audio', 'image']
      const fileTypeArray = ['audio', '']
      
      // Upload storageFile
      const {
        data: fileData,
        error: fileError,
      } = await supabase
        .storage
        .from(storageArray[values.type])
        .upload(`${storageArray[values.type]}-${uniqueID}`, storageFile, {
          cacheControl: '3600',
          upsert: false }
        )

      if (fileError) {
        setIsLoading(false)
        return toast.error(`failed ${storageArray[values.type]} upload.`)
      }

      // Create a record in database
      const {
        error: supabaseError
      } = await supabase
        .from('fs')
        .insert({
          type: values.type,
          target_id: values.target_id,
          name: values.name,
          owner_id: user.id,
          file_type: fileTypeArray[values.type],
          path: fileData.path,
          detail: {
            author: values.detail, 
          },
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Song created!')
      reset()
      uploadModal.onClose()

      if (fileError) {
        setIsLoading(false)
        return toast.error('failed file upload.')
      }

    } catch (error) {
      console.error("Error details: ", error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add an file"
      description="Upload audio/folder"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >

      <div className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-1.5">
          <Button
            onClick={() => { 
              setUploadType(1)
              setValue('type', 1)
            }}
          >
            upload audio
          </Button>
          <Button
            onClick={() => { 
              setUploadType(0)
              setValue('type', 0)
            }}
          >
            upload folder
          </Button>
        </div>

        { uploadType === 1 ? // Submit File
          ( <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <Input 
              id="title"
              disabled={isLoading}
              {...register('name', { required: true })}
              placeholder="Audio title"
            />
            <Input 
              id="author"
              disabled={isLoading}
              {...register('detail', { required: true })}
              placeholder="Audio author"
            />
            <div>
              <div className="pb-1">
                select a song file
              </div>
              <Input
                id="audio"
                type="file"
                disabled={isLoading}
                accept=".mp3, .m4a, .aac"
                {...register('file', { required: true })}
              />
            </div>
            <Button disabled={isLoading} type="submit" className="text-black h-[40px]">
              Create 
            </Button>
          </form> )

            : // Submit Folder
          ( <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <Input 
              id="name"
              disabled={isLoading}
              {...register('name', { required: true })}
              placeholder="Folder name"
            />
            <div>
              <div className="pb-1">
                select a cover image
              </div>
              <Input
                id="image"
                type="file"
                disabled={isLoading}
                accept="image/*"
                {...register('file', { required: true })}
              />
            </div>
            <Button disabled={isLoading} type="submit" className="text-black h-[40px]">
              Create 
            </Button>
          </form> )

        }
      </div>
    </Modal>
  );
}

Input.displayName = "Input";

export default UploadModal;