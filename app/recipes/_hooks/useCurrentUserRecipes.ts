import { useQuery } from '@tanstack/react-query'
import { getCurrentUserRecipes } from '../_actions/get-current-user-recipes'

const useCurrentUserRecipes = () => {
  return useQuery({
    queryKey: ['current-user-recipes'],
    queryFn: () => getCurrentUserRecipes()
  })
}

export default useCurrentUserRecipes
