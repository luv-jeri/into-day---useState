import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import FormField from '../../components/FormField';
export default function CreateForm() {
  const [fields, setFields] = useState([{}]);

  const filedHandler = (e) => {
    const i = parseInt(e.target.getAttribute('i'));
    console.log('+----->>', e.target.type);
    //` EXTRA MUST BE CHECKED
    if (e.target.id === 'name' && e.target.value === '') {
      // delete fields[e.target.i];
      const temp = [...fields];
      temp.splice(i, 1);
      setFields(temp);
    }
    // ` Real Code
    const obj = {
      ...fields[i],
      [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };
    fields[i] = obj;
  };

  const addField = () => {
    const lastEl = fields.at(-1); //`  fields[fields.length - 1];
    if (lastEl && !lastEl.name) {
      return showNotification({
        title: 'Error',
        message: 'Please fill the previous field',
      });
    }

    setFields([...fields, {}]);
  };

  return (
    <div>
      <div
        onChange={filedHandler}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addField();
          }
        }}
      >
        {fields.map((el, index) => {
          return <FormField key={index} i={index}></FormField>;
        })}
      </div>
      <Button onClick={addField}>Add Fields</Button>
    </div>
  );
}