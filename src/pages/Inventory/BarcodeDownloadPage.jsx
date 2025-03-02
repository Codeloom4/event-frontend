import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { toPng } from "html-to-image";
import { Button, CircularProgress } from "@mui/material";

const BarcodeDownloadPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uncomment this when the backend is ready
    /*
    fetch("/api/barcodes") // Adjust API endpoint as needed
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching barcodes:", err);
        setLoading(false);
      });
    */

    // Mock data for testing (Remove this once the backend is ready)
    const mockData = [
      { id: 1, name: "Item A", barcode: "123456789" },
      { id: 2, name: "Item B", barcode: "987654321" },
    ];
    setItems(mockData);
    setLoading(false);
  }, []);

  const handleDownload = (id) => {
    const barcodeElement = document.getElementById(`barcode-${id}`);
    if (!barcodeElement) return;

    toPng(barcodeElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `barcode-${id}.png`;
        link.click();
      })
      .catch((err) => console.error("Error generating image:", err));
  };

  if (loading) return <CircularProgress />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Barcode Download Page</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow-md text-center">
            <h3 className="font-semibold mb-2">{item.name}</h3>
            <div id={`barcode-${item.id}`} className="bg-white p-2">
              <Barcode value={item.barcode} />
            </div>
            <Button 
              variant="contained" 
              color="info" 
              className="mt-2"
              onClick={() => handleDownload(item.id)}
            >
              Download Barcode
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarcodeDownloadPage;
