import { useEffect, useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";

const dataSet = [
  { id: 1, name: "Item 1", description: "Description 1" },
  { id: 2, name: "Item 2", description: "Description 2" },
  { id: 3, name: "Item 3", description: "Description 3" },
];

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="px-3 py-1 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-3 py-1 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [eventsData]
  );

  const retrieveData = () => {
    setEventsData(dataSet);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setEventsData((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
    } else {
      const newEvent = {
        id: eventsData.length + 1,
        ...formData,
      };
      setEventsData((prevData) => [...prevData, newEvent]);
    }
    setFormData({ name: "", description: "" });
    setEditingId(null);
  };

  const handleEdit = (data) => {
    setFormData({ name: data.name, description: data.description });
    setEditingId(data.id);
  };

  const handleDelete = (id) => {
    setEventsData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editingId ? "Update" : "Submit"}
        </Button>
      </Form>

      <div className="mt-4">
        {eventsData.map((event) => (
          <div key={event.id} className="p-3 mb-2 border rounded shadow">
            <h5>{event.name}</h5>
            <p>{event.description}</p>
            <button
              onClick={() => handleEdit(event)}
              className="px-3 py-1 mr-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              className="px-3 py-1 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Events;
