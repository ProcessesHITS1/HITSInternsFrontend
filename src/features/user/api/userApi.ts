import { authApi } from '~shared/api'
import {
  ChangePasswordReq,
  ChangePasswordResp,
  CreateUserReq,
  CreateUserResp,
  EditProfileReq,
  EditProfileResp,
  SignInReq,
  SignInResp,
} from './types'

const endpoints = authApi.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation<EditProfileResp, EditProfileReq>({
      query: (body) => ({
        url: '/users/profile',
        method: 'PUT',
        body,
      }),
    }),
    changePassword: builder.mutation<ChangePasswordResp, ChangePasswordReq>({
      query: (body) => ({
        url: '/users/profile/change-password',
        method: 'PUT',
        body,
      }),
    }),
    signIn: builder.mutation<SignInResp, SignInReq>({
      query: (body) => ({
        url: '/users/sign-in',
        method: 'POST',
        body,
      }),
    }),
    createUser: builder.mutation<CreateUserResp, CreateUserReq>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['userList'],
    }),
  }),
})

export const {
  useSignInMutation,
  useChangePasswordMutation,
  useEditProfileMutation,
  useCreateUserMutation,
} = endpoints
