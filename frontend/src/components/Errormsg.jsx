const ErrorMsg = ({fieldName, fieldValue, validateInput }) => {
    let fieldValueValidate = '';
    if (fieldName == 'email') {
        fieldValueValidate = ["http://", "https://"].some(prefix => fieldValue.startsWith(prefix));
    } else {
        fieldValueValidate = fieldValue.startsWith('');
    }
    

    return (
        <div className="error-container">
            {!fieldValue && (() => {
                validateInput = false;
                return <small className="error-msg">This field is required</small>;
            })()}
            {fieldValue && !fieldValueValidate && (() => {
                validateInput = false;
                return <small className="error-msg">Invalid field value</small>;
            })()}

            {fieldValue && fieldValueValidate && (() => {
                validateInput = true;
                return;
            })()}
        </div>
    )
}

export default ErrorMsg;