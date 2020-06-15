import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";

import { AppBar } from "../AppBar/components";
import { TopicPageContainer, TopicsPopular } from "../Topics/components";
import {
    ExploreOurFeaturesDescription,
    PrometeusDescription
} from "../PrometeusDescription";
import { LoginForm } from "../Authorization/components";
import { Layout } from "../Layout";
import { useAuthorization, useStore } from '../store/hooks';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    mobileTopicsPopular: {
        position: "absolute",
        left: 0,
        width: "100%",
        height: "100%"
    },
}));


export const TopicPage = observer(() => {
    const { currentUser } = useAuthorization();
    const { isTopicsMenuOpen } = useStore().topicsPopular;
    const classes = useStyles();
    
    console.log(isTopicsMenuOpen);

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar currentActiveRoute="topics" />
            </Grid>
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={9}
                            className="right-content-container"
                        >
                            {!currentUser ? (
                                <Grid item className="login-form-container">
                                    <LoginForm />
                                </Grid>
                            ) : (
                                <TopicPageContainer />
                            )}
                        </Grid>
                        <Grid item md={3} className={`right-banners-container ${
                          isTopicsMenuOpen && classes.mobileTopicsPopular}`}>
                            {currentUser ? (
                              <TopicsPopular />
                            ) : (
                                <ExploreOurFeaturesDescription />
                            )}
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
