import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (name.trim() !== "" && author.trim() !== "") {
      const slugName = name
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "+");
      const slugAuthor = author
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "+");
      navigate(`/search/${slugName}/${slugAuthor}`);
      setName("");
      setAuthor("");
      setIsSubmitDisabled(true);
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "qn") {
      setName(inputValue);
    } else if (inputName === "qa") {
      setAuthor(inputValue);
    }

    setIsSubmitDisabled(!(name.trim() !== "" && author.trim() !== ""));
  };

  return (
    <Form className="w-70 mb-3 " onSubmit={submitHandler}>
      <InputGroup className="flex-grow-1 d-flex me-auto gap-2 w-70">
        <FormControl
          type="text"
          name="qn"
          id="qn"
          placeholder="Search Book Name"
          aria-label="Search Book Name"
          aria-describedby="button-search"
          onChange={handleInputChange}
          value={name}
          required
        ></FormControl>
        <FormControl
          type="text"
          name="qa"
          id="qa"
          placeholder="Search Book Author"
          aria-label="Search Book Author"
          aria-describedby="button-search"
          onChange={handleInputChange}
          value={author}
          required
        ></FormControl>
        <Button
          variant="outline-primary"
          type="submit"
          id="button-search"
          disabled={isSubmitDisabled}
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
