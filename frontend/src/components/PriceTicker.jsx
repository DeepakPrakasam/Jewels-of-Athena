import Marquee from "react-fast-marquee";

function PriceTicker() {
  return (
    <div className="alert alert-warning rounded-2">
      <marquee behavior="alternate" direction="left">
        Today: <strong>Gold</strong> 22k - 1g = Rs. 8940 | Today:{" "}
        <strong>Silver</strong> 1g = Rs. 111.00 | Today:{" "}
        <strong>Platinum</strong> 1g = Rs. 3412
      </marquee>
    </div>
  );
}

export default PriceTicker;
