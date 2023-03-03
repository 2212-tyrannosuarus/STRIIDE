<List
  component="nav"
  aria-labelledby="nested-list-subheader"
  subheader={
    <ListSubheader component="div" id="nested-list-subheader">
      User Management
    </ListSubheader>
  }
  className={classes.root}
>
  <ListItem button onClick={handleClick}>
    <ListItemIcon>
      <InboxIcon />
    </ListItemIcon>
    <ListItemText primary="Inbox" />
    {open ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
    </List>
  </Collapse>
</List>;
