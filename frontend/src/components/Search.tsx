import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      const slugName = name
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "+");
      navigate(`/search/${slugName}`);
      setName("");
      setIsSubmitDisabled(true);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "qn") {
      setName(inputValue);
    }

    setIsSubmitDisabled(!(name.trim() !== ""));
  };

  return (
    <div>
      {showAlert ? (
        <div className="alert alert-danger">Please fill all fields!</div>
      ) : (
        <div></div>
      )}
      <Form className="w-70 mb-3 " onSubmit={submitHandler}>
        <InputGroup className="flex-grow-1 d-flex me-auto gap-2 w-70">
          <FormControl
            type="text"
            name="qn"
            id="qn"
            placeholder="Search Book"
            aria-label="Search Book"
            aria-describedby="button-search"
            onChange={handleInputChange}
            value={name}
            required
          ></FormControl>
          <Button
            variant="outline-primary"
            type="submit"
            id="button-search"
            style={{ cursor: isSubmitDisabled ? "not-allowed" : "pointer" }}
          >
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
