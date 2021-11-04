import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";

const FindPropertiesList = (props) => {
  const { properties } = props;

  const columns = useMemo(() => [{
    name: "Property id",
    selector: row => row.id
  }, {
    name: "Property longitude",
    selector: row => row.geocode_geo.coordinates[0]
  }, {
    name: "Property latitude",
    selector: row => row.geocode_geo.coordinates[1]
  }], [properties]);

  return <Paper sx={{ margin: "20px 0" }}>
    <DataTable columns={columns} data={properties} />
  </Paper>
}

const mapStateToProps = (state) => {
  const { properties } = state.find_properties;
  return {
    properties: properties ? properties : []
  };
}

export default connect(mapStateToProps, null)(FindPropertiesList);