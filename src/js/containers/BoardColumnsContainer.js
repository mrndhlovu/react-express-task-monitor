import { connect } from "react-redux";
import BoardColumns from "../components/BoardColumns";

const mapStateToProps = state => ({
  columns: getColumns()
});

export default connect(mapStateToProps, { getBoardColumns })(BoardColumns);
