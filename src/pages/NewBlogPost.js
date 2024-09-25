import { useMemo, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const CreateNewArticle = () => {
  const PROMPT =
    "You are a creative blog writer. write a 1000-word blog post about the title below. You can write anything you want, but it must be at least 50 words long. The title is: ";
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formData });
  };

  const generateContent = () => {
    setGenerating(true);
    if (!formData?.title) {
      return false;
    }
    const requestParams = {
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        { role: "system", content: PROMPT + formData?.title },
        { role: "user", content: formData?.title },
      ],
      max_new_tokens: 2048,
    };
    fetch("https://api-inference.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
      },
      body: JSON.stringify(requestParams),
    })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.choices[0].message.content);
        console.log("generated text", { data });
        setGenerating(false);
      })
      .catch(console.error);
  };

  const postContent = useMemo(() => {
    return content || formData.content;
  }, [content, formData.content]);
  return (
    <Container>
      <h2>New Blog Post</h2>
      <Form onSubmit={handleSubmit} className="space-y-4">
        <Form.Group controlId="title" className="mb-2">
          <Form.Label className="font-medium">Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="what's on your mind"
          />
        </Form.Group>
        <Form.Group controlId="content" className="mb-2">
          <Form.Label className="font-medium">Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            value={postContent}
            onChange={handleChange}
            placeholder="Text will be generated here (PS: this is a primitive text generator only for demo purpose)"
          />
          {generating && (
            <p className="text-purple-700 my-1">Generating content...</p>
          )}
          <Button onClick={generateContent} type="button" className="mt-2">
            Generate Content
          </Button>
        </Form.Group>
        <Form.Group controlId="date" className="mb-2">
          <Form.Label className="font-medium">Date:</Form.Label>
          <Form.Control
            type="text"
            name="date"
            value={formData.date}
            readOnly
          />
        </Form.Group>
        <Button variant="warning" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
export default CreateNewArticle;
