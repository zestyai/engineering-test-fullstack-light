import React, { useCallback, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import Box from "@mui/material/Box";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { fetchAllProps } from "../store/utils/thunkCreators";
import { useHistory } from "react-router";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const sortIcon = <ArrowCircleDownIcon />;

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  margin: theme.spacing(5)
}));

const PropList = (props) => {
  const { properties, fetchAllProps } = props;
  const history = useHistory();

  const handleClickLink = useCallback((id, e) => {
    e.preventDefault();    
    history.replace(`/detail/${id}`);
  }, [properties]);

  const columns = useMemo(() => [{
    name: "Property latitude",
    selector: row => row.geocode_geo.coordinates[0]
  }, {
    name: "Property longitude",
    selector: row => row.geocode_geo.coordinates[1]
  }, {
    name: "Property Detail",
    selector: row => <Link href="#" onClick={handleClickLink.bind(this, row.id)}>Details</Link>
  }], [properties]);

  useEffect(() => {
    fetchAllProps();
  }, []);

  return <GridBox>    
    {properties && <DataTable columns={columns}
      data={properties}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      sortIcon={sortIcon}
      pagination
    />}</GridBox>
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties.properties,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProps: () => {
      dispatch(fetchAllProps());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropList);