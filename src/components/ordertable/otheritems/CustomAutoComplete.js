/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

export default function FreeSoloCreateOption({ order, setFormInfo, formInfo }) {
  const [value, setValue] = React.useState(null);

  const onSend = () => {
    console.log("value", value?.status);
  };

  console.log({ order });
  console.log(order?.selectArray);
  console.log(order?.name);
  console.log(formInfo[order?.name]);

  const selectedOption = order?.selectArray || [{ id: 1, status: "" }];

  const handleChange = (event, newValue) => {
    setFormInfo({ ...formInfo, [order?.name]: newValue.status });
  };

  return (
    <div>
      <Autocomplete
        value={formInfo[order?.name]}
        size="small"
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            handleChange(event, newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            handleChange(event, newValue.inputValue);
          } else {
            handleChange(event, newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              status: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={selectedOption}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.status;
        }}
        renderOption={(option) => {
          console.log(option);
          return option.status;
        }}
        style={{ width: 150 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={order?.label}
            name={order?.name}
            variant="outlined"
          />
        )}
      />
      {/* <button onClick={onSend}>Send</button> */}
      {/* {order?.selectArray?.map((item, index) => {
        console.log(item?.status);
      })} */}
    </div>
  );
}
