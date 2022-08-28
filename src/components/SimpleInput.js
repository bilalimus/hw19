import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [isNameValid, setIsNameValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [name, setName] = useState("");

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setIsNameValid(true);

    const enteredValue = nameInputRef.current.value;

    if (enteredValue.trim().length < 3) {
      setIsNameValid(false);
      return;
    }
    console.log("send to server");
  };

  const nameInputBlurHandler = () => {
    setIsNameValid(true);
    const enteredValue = nameInputRef.current.value;

    if (enteredValue.trim().length < 3) {
      setIsNameValid(false);
      setIsTouched(false);
      return;
    }
    setIsTouched(true);
  };

  const nameInputChangeHandler = (event) => {
    setName(event.target.value);
    setIsNameValid(true);
    setIsTouched(true)
    if (event.target.value.trim().length < 3) {
      setIsNameValid(false);
      setIsTouched(false);
      return;
    }
  };

  const inputClasses = isNameValid ? "form-control" : "form-control invalid";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameInputChangeHandler}
          ref={nameInputRef}
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
        />
        {!isNameValid && (
          <p className="error-text">
            Your name should be contain more than 2 characters.
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isTouched}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
