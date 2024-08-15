import { Encrypt_CompareSalt } from '@/libraries/utils/encrypt';

/*
:--------------------------------------------------------------------------
: @isPasswordValid
: | Checkout if the password is valid
:--------------------------------------------------------------------------
*/

export async function User_Method_IsPasswordValid(
    bodyPassword: string,
    userPassword: string
): Promise<Boolean> {
    const isValid = await Encrypt_CompareSalt(bodyPassword, userPassword);
    return !!isValid;
}
