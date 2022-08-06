import React from "react";

import * as TS from "typescript";

const defaultCodeString = `(data:{a:string}) =>  {
  console.log('this will be displayed in the console');
  const t = prompt('enter something');
  return 'ba' + data.a + 't' + t;
}`;

const ArgForm = ({ setExec }: { setExec: (a: any) => void }) => {
  const [arg, setArg] = React.useState<string>('{"a":"my text"}');

  const handleExec = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const j = JSON.parse(arg);

      setExec(j);
    } catch (err) {
      alert("arg must be a json");
    }
  };

  return (
    <form onSubmit={handleExec}>
      <input type="text" value={arg} onChange={(v) => setArg(v.target.value)} />
      <button className="btn btn-primary" type="submit">
        Exec
      </button>
      <br />
    </form>
  );
};

export default () => {
  const [value, setValue] = React.useState<string>(defaultCodeString);
  const [error, setError] = React.useState<string | undefined>();

  const [fx, setFx] = React.useState<((x: string) => string) | undefined>();
  const [exec, setExec] = React.useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const execKey = "exec";
      const prepareCodeString = `({${execKey}: ${value}})`;
      const c = TS.transpile(prepareCodeString);

      const t = eval(c);

      const fx = t[execKey];

      // there is a bug when passing a funtion, the function needs to be wrapped in another function else it is being called
      setFx(() => fx);
    } catch (e) {
      console.log((e as Error).message);
      setError((e as Error).message);
    }
  };

  if (fx) {
    const handleExec = (e: any) => {
      setExec(fx(e));
    };

    return (
      <>
        <ArgForm setExec={handleExec} />
        {exec && (
          <div className="alert alert-primary">
            <h3>Result</h3>
            <pre>{exec}</pre>
          </div>
        )}
        <br />
        <button className="btn btn-secondary" onClick={() => setFx(undefined)}>
          Back
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert alert-danger">{error}</p>}

      <textarea
        className="form-control"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
