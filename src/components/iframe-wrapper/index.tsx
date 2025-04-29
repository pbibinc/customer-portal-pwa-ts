import Preview from "./single-components/Preview";
import Footer from "./single-components/Footer";

const IframeWrapper: React.FC = () => {
  return (
    <>
      {/* <div className="preview-iframe-wrapper"> */}
      <Preview />
      <Footer />
      {/* </div> */}
    </>
  );
};

export default IframeWrapper;
