import Title from "./Title";
import MaterialForm from "./MaterialForm";
import AvailabilityForm from "./AvailabilityForm";
import PriceForm from "./PriceForm";
import LocationForm from "./LocationForm";
import TargetForm from "./TargetForm";
import UploadVideoForm from "./UploadVideoForm";
import UploadImageForm from "./UploadImageForm";
import UploadPDF from "./UploadPDF";
import DoneButton from "./DoneButton";

const formErrors = {
  images: [null, null, null, null, null],
  material: {
    title: "",
    description: "",
    category: { value: -1 },
    condition: { value: -1 }
  },
  availability: {
    quantity: "",
    unit: { value: -1 }
  },
  price: {
    pricePerUnit: "",
    pricingTerm: { value: -1 },
    auctionInterval: ""
  },
  location: {
    address: "",
    city: "",
    zipcode: ""
  }
};

export {
  Title,
  MaterialForm,
  AvailabilityForm,
  PriceForm,
  LocationForm,
  TargetForm,
  UploadVideoForm,
  UploadImageForm,
  DoneButton,
  UploadPDF,
  formErrors
};
