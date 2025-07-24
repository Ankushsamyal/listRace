import React from 'react'
import Signup from '../SignUp'
import { SIGNUP_CONSTANT } from '../../../../constant/HeadingConstant';
import { ROLE } from '../../../../constant/Role';

function AdminSignup() {
    const SignupTitle = SIGNUP_CONSTANT.ADMIN_SIGNUP_TITLE;
    const userRole = ROLE.ADMIN;
  return (
    <div>
        <Signup SignupTitle={SignupTitle} userRole={userRole}/>
    </div>
  )
}

export default AdminSignup