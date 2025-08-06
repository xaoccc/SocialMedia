const ErrorMsg = ({ fieldName, fieldValue, validateInput }) => {
    // let fieldValueValidate = '';
    let fieldValueValidate = false;

    const isValid = (fieldName, fieldValue) => {
        if (fieldName == 'email') {
            fieldValueValidate = ["http://", "https://"].some(prefix => fieldValue.startsWith(prefix));
        } else if (fieldName == 'name') {
            fieldValueValidate = /^[A-Z]{1}[a-z]+$/.test(fieldValue);
        } else {
            fieldValueValidate = fieldValue.startsWith('');
        }
    }

    isValid(fieldName, fieldValue)

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