import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Dashboard_Setting_Integration() {
  const classes = useStyles();

  const onIntegrateClick = () => {
    window.location.href = 'http://localhost:5000/api/user/xero/connect'
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={onIntegrateClick}>
        Integrate my Xero organisation
      </Button>
    </div>
  );
}