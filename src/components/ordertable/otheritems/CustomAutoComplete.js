/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FreeSolo({ order, setFormInfo, formInfo }) {
  console.log(formInfo[order?.name]);

  return (
    <Autocomplete
      style={{ minWidth: 150 }}
      id={order?.label}
      size="small"
      value={String(formInfo[order?.name])}
      // value={order?.status}
      freeSolo
      options={order?.selectArray?.map((option) => option.status)}
      onChange={(e) =>
        setFormInfo({ ...formInfo, [order?.name]: e.target.innerHTML })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) =>
            setFormInfo({ ...formInfo, [order?.name]: e.target.value })
          }
          label={order?.label}
          margin="normal"
          variant="outlined"
          type={order?.type || "text"}
        />
      )}
    />
  );
}
