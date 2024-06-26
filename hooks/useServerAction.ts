import { ActionState, FieldErrors } from '@/lib/create-safe-action'
import { useCallback, useState } from 'react'

type ServerAction<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>

interface UseServerActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

export const useServerAction = <TInput, TOutput>(
  action: ServerAction<TInput, TOutput>,
  options: UseServerActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined)

  const [error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true)
      try {
        const result = await action(input)

        if (!result) return

        setFieldErrors(result?.fieldErrors)

        if (result.error) {
          options.onError?.(result.error)
          setError(result.error)
        }
        if (result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    },
    [action, options]
  )
  return { data, execute, isLoading, error, fieldErrors }
}
