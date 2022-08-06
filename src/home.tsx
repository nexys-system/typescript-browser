import React from "react";

import * as TS from "typescript";

const defaultCodeString = "() =>  'ba'";

export default () => {
  const [value, setValue] = React.useState<string>(defaultCodeString);
  const [error, setError] = React.useState<string | undefined>();
  const [fx, setFx] = React.useState<((x: string) => string) | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const execKey = "exec";
      const prepareCodeString = `({${execKey}: ${value}})`;
      const c = TS.transpile(prepareCodeString);
      console.log(c);
      const t = eval(c);

      const fx = t[execKey];

      // console.log(fx());
      // console.log(typeof fx);

      const f2: (x: string) => string = (x: string) => "bac" + x;

      setFx(() => fx);
    } catch (e) {
      console.log((e as Error).message);
      setError((e as Error).message);
    }
  };

  if (fx) {
    return (
      <>
        <pre>{fx("ghj")}</pre>
        <button onClick={() => setFx(undefined)}>back</button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert alert-danger">{error}</p>}

      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
