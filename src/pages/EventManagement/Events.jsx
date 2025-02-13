import { useEffect, useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import EventsService from "../../service/EventsService";
// import { EventsService } from "../../service/EventsService"

const dataSet = [
  { id: 1, name: "Item 1", description: "Description 1" },
  { id: 2, name: "Item 2", description: "Description 2" },
  { id: 3, name: "Item 3", description: "Description 3" },
];

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    name: "",
    description: "",
  });
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

  const handleSave = async (e) => {
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
      const response = await EventsService.createEvent(formData);
    }
    setFormData({ id: "", type: "", name: "", description: "" });
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
      <div className="flex justify-center items-center">
        <Form
          onSubmit={handleSave}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            {editingId ? "Edit Event" : "Create Event"}
          </h2>
          <Form.Group className="mb-4" controlId="eventType">
            <Form.Label className="font-medium">Type</Form.Label>
            <Form.Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="p-2 border rounded w-full"
            >
              <option value="1">Type 1</option>
              <option value="2">Type 2</option>
              <option value="3">Type 3</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="eventName">
            <Form.Label className="font-medium">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 border rounded w-full"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="eventDescription">
            <Form.Label className="font-medium">Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-2 border rounded w-full"
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="px-6 py-2">
              {editingId ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </div>

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
