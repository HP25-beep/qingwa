"use client";

import uniqid from "uniqid"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import { useUserFS } from "@/hooks/useUserFS"

import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"

const UploadModal = () => {
  const router = useRouter()
  const { nodePath } = useUserFS()
  const { user, userDetails } = useUser()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(false)
  const [uploadType, setUploadType] = useState<number>(1)
  const uploadModal = useUploadModal()
  const fileOutputArray = ['folder', 'audio']

  const {
    register, 
    handleSubmit,
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      type: null, 
      parent_id: nodePath[nodePath.length-1]?.id ?? null, 
      target_id: null, 
      name: null, 
      owner_id: userDetails?.id ?? null, 
      file_type: '', 
      file: null,
      detail: null, 
    }
  })

  useEffect(() => {
    setValue('parent_id', nodePath[nodePath.length-1]?.id ?? null)
  }, [nodePath])

  useEffect(() => {
    setValue('owner_id', userDetails?.id)
  }, [userDetails])

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {

    try {
      setIsLoading(true)

      values.parent_id = nodePath[nodePath.length-1]?.id ?? null
      values.owner_id = userDetails!.id
      values.type = uploadType

      const storageFile = values.file?.[0]

      if (
        (values.type == 0 && (!values.owner_id || !values.name || !storageFile || !user)) || 
        (values.type == 1 && (!values.owner_id || !values.name || !values.detail || !storageFile || !user))
      ) {
        toast.error(`Missing fields ${values.owner_id}`)
        return
      }

      const uniqueID = uniqid()

      const storageArray = ['image', 'audio']
      
      // Upload storageFile
      const originalName = storageFile.name
      const extension = originalName.split('.').pop()
      const fileNameWithExt = `${storageArray[values.type]}-${uniqueID}.${extension}`

      const {
        data: fileData,
        error: fileError,
      } = await supabase
        .storage
        .from(storageArray[values.type])
        .upload(fileNameWithExt, 
          storageFile, {
          cacheControl: '3600',
          upsert: false }
        )

      if (fileError) {
        setIsLoading(false)
        return toast.error(`Failed ${storageArray[values.type]} upload.`)
      }

      // Create a record in database
      const {
        error: supabaseError
      } = await supabase
        .from('fs')
        .insert({
          type: values.type,
          parent_id: values.parent_id,
          target_id: values.target_id,
          name: values.name,
          owner_id: values.owner_id,
          file_type: storageFile.type,
          path: fileData.path,
          detail: values.detail ? {
            author: values.detail, 
          } : null,
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('File created!')
      reset()
      uploadModal.onClose()

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
      description={`
        User ${userDetails?.full_name ?? "Username"} 
        upload ${fileOutputArray[uploadType]}
         to folder ${nodePath[nodePath.length-1]?.name ?? "root"}
      `}
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >

      <div className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-1.5">
          <Button
            disabled={isLoading}
            onClick={() => { 
              setUploadType(1)
              reset()
              setValue('type', 1)
            }}
          >
            upload audio
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => { 
              setUploadType(0)
              reset()
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
            <Button 
              disabled={isLoading} 
              type="submit" 
              className="text-black h-[40px]"
            >
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
            <Button 
              disabled={isLoading} 
              type="submit" 
              className="text-black h-[40px]"
            >
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