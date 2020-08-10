import React from "react";
import { Link } from "mobx-router";
import { Avatar, Typography, makeStyles } from "@material-ui/core";

import { Routes } from "../../routes";
import { routerStore } from "../../store";

const useStyles = makeStyles(theme => ({
    postLink: {
        display: "flex",
        padding: "15px 0",
        textDecoration: "none"
    },
    searchItemAvatar: {
        marginRight: 12,
        height: 35,
        width: 35
    },
    searchItemContent: {
        width: "100%",

        "& > p": {
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "16px",
            margin: "4px 0 0",
            color: theme.palette.text.main
        }
    },
    searchItemRow: {
        display: "flex",
        justifyContent: "space-between",

        "& p": {
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            textDecoration: "none",
            color: theme.palette.text.main
        },

        "& small": {
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "18px",
            color: theme.palette.text.secondary
        }
    }
}));

export const SearchResultItem = ({ user }) => {
    const classes = useStyles();

    return (
        <div key={user.id}>
            <Link
                className={classes.postLink}
                view={Routes.userProfile}
                params={{ username: user.username }}
                store={routerStore}
            >
                <Avatar
                    className={classes.searchItemAvatar}
                    src={
                        user.avatar ||
                        "http://localhost:3000/avatars/original/missing.png"
                    }
                />
                <div className={classes.searchItemContent}>
                    <div className={classes.searchItemRow}>
                        <Typography>
                            <div>{user.display_name}</div>
                            <small>@{user.username}</small>
                        </Typography>
                    </div>
                </div>
            </Link>
        </div>
    );
};
