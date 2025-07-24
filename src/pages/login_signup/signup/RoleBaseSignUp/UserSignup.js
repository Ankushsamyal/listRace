import React from 'react'
import { SIGNUP_CONSTANT } from '../../../../constant/HeadingConstant';
import { ROLE } from '../../../../constant/Role';
import Signup from '../SignUp';

function UserSignup() {
    const SignupTitle = SIGNUP_CONSTANT.USER_SIGNUP_TITLE;
    const userRole = ROLE.USER;
  return (
    <div>
        <Signup SignupTitle={SignupTitle} userRole={userRole}/>
    </div>
  )
}

export default UserSignup