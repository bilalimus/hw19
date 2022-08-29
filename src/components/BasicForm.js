import { useReducer } from "react";

let regEx = new RegExp("[A-Z]+([ '-][a-zA-Z]+)*");
let emailRegEx = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const formReducer = (state, action) => {
  // console.log(action);
  if (action.type === "NAME") {
    return {
      ...state,
      name: action.value,
      isNameValid: true,
    };
  }
  if (action.type === "LAST_NAME") {
    return {
      ...state,
      lastName: action.value,
      isLastNameValid: true,
    };
  }
  if (action.type === "EMAIL") {
    return {
      ...state,
      email: action.value,
      isEmailValid: true,
    };
  }
  if (action.type === "NO_VALID") {
    return {
      ...state,
      isNameValid: action.isValid === "NAME" ? false : state.isNameValid,
      isLastNameValid:
        action.isValid === "LAST_NAME" ? false : state.isLastNameValid,
      isEmailValid: action.isValid === "EMAIL" ? false : state.isEmailValid,
    };
  }
  if (action.type === "IS_TOUCHED") {
    return {
      ...state,
      isTouched: true,
    };
  }
  return state;
};

const BasicForm = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    isNameValid: true,
    lastName: "",
    isLastNameValid: true,
    email: "",
    isEmailValid: false,
    isTouched: false,
  });

  const nameChangeHandler = (event) => {
    dispatch({ type: "NAME", value: event.target.value });
    if (!regEx.test(event.target.value.trim())) {
      dispatch({ type: "NO_VALID", isValid: "NAME" });
    }
  };

  const lastNameChangeHandler = (event) => {
    dispatch({ type: "LAST_NAME", value: event.target.value });
    if (!regEx.test(event.target.value.trim())) {
      dispatch({ type: "NO_VALID", isValid: "LAST_NAME" });
    }
  };

  const emailChangeHandler = (event) => {
    dispatch({ type: "EMAIL", value: event.target.value });
    if (!event.target.value.trim().match(emailRegEx)) {
      dispatch({ type: "NO_VALID", isValid: "EMAIL" });
    }
    if (state.isEmailValid && state.isNameValid && state.isLastNameValid) {
      dispatch({ type: "IS_TOUCHED" });
    }
  };

  console.log(state.isNameValid,'name');
  console.log(state.isLastNameValid,'lastName')
  console.log(state.isEmailValid,'email');

  const emailClasses = state.isEmailValid
    ? "form-control"
    : "form-control invalid";
  const nameClasses = state.isNameValid
    ? "form-control"
    : "form-control invalid";
  const lastNameClasses = state.isLastNameValid
    ? "form-control"
    : "form-control invalid";

  return (
    <form>
      <div className="control-group">
        <div className={nameClasses}>
          <label htmlFor="name">First Name</label>
          <input onChange={nameChangeHandler} type="text" id="name" />
          {!state.isNameValid && (
            <p className="error-text">Your name is incorrect.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input onChange={lastNameChangeHandler} type="text" id="name" />
          {!state.isLastNameValid && (
            <p className="error-text">Your Last Name is incorrect.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input onChange={emailChangeHandler} type="text" id="name" />
        {!state.isEmailValid && (
          <p className="error-text">Your email is incorrect or empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!state.isTouched}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
