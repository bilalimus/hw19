import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [isNameValid, setIsNameValid] = useState(true);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setIsNameValid(true)

    const enteredValue = nameInputRef.current.value;

    if (enteredValue.trim().length < 3) {
      setIsNameValid(false);
      return;
    }
    console.log('send to server');
  };

  const inputClasses = isNameValid ? 'form-control' : 'form-control invalid' 
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!isNameValid && (
          <p className="error-text">
            Your name should be contain more than 2 characters.
          </p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
