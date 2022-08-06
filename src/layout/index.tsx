import Footer from "./footer";

export default ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="container">
        <h1>Typescript Execution in Browser</h1>

        <div className="row">
          <div className="col-6">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};
