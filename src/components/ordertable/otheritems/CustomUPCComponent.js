import { makeStyles } from "@material-ui/core/styles";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";

const useRowStyles = makeStyles({
  upcStyle: {
    fontWeight: "normal",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "max-content",
  },
});

const CustomUPCComponent = ({ item, in_stock, link = false }) => {
  const classes = useRowStyles();

  const content = (
    <p className={classes.upcStyle}>
      {item} {in_stock ? <StoreMallDirectoryIcon /> : null}
    </p>
  );

  if (link)
    return (
      <a
        href={link}
        alt=""
        target="_blank"
        rel="noreferrer"
        style={{ display: "block", width: "min-content" }}
      >
        {content}
      </a>
    );
  else return content;
};

export default CustomUPCComponent;
