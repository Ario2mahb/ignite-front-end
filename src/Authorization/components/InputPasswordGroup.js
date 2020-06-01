import React from 'react';
import { FormControl, IconButton, InputAdornment, makeStyles, TextField, useTheme } from '@material-ui/core';
import generateRandomString from 'random-string';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useLocalization } from '../../store/hooks';
import { CopyToClipboardButton } from '../../CopyToClipboardButton/components';

const useStyles = makeStyles(theme => ({
    titleBold: {
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        lineHeight: '24px',
    },
    descriptionSecondary: {
        marginTop: '22px',
        color: '#A2A2A2',
        fontSize: '15px',
        lineHeight: '26px',
        fontFamily: 'Museo Sans Cyrl Regular',
    },
    link: {
        margin: '16px 0',
        cursor: 'pointer',
        color: '#FF5C01',
        textDecoration: 'underline',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '18px',
    },
    inputGroup: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: '10px',
    },
    iconButton: {
        padding: 0,
    },
    underlineInput: {
        '&:hover': {
            borderColor: '#F1EBE8',
        },
        '&:before': {
            borderColor: '#F1EBE8',
        },
    },
    copyPasswordInputAdornment: {
        paddingBottom: theme.spacing(2),
    },
}));

export const InputPasswordGroup = ({
    formValues,
    formErrors,
    onValueChange,
    showPassword,
    onShowPasswordChange,
    title,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { l } = useLocalization();

    const handleChange = (prop) => (event) => {
        onValueChange(prop, event.target.value);
    };

    const handleClickShowPassword = () => {
        onShowPasswordChange(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const generateRandomPassword = () => {
        const randomPassword = generateRandomString({
            length: 12,
            numeric: true,
            letters: true,
            special: true,
        });
        onValueChange('password', randomPassword);
        onValueChange('passwordConfirmation', randomPassword);
    };

    return (
        <div className={classes.inputGroup}>
            <div className={classes.titleBold}>{title}</div>
            <FormControl classes={{ root: classes.input }}>
                <TextField
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formValues.password}
                    label="Password"
                    onChange={handleChange('password')}
                    className={classes.underlinedInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.copyPasswordInputAdornment}
                            >
                                <CopyToClipboardButton
                                    textToCopy={formValues.password}
                                    iconColor={theme.palette.primary.main}
                                />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password && l(formErrors.password)}
                />
            </FormControl>
            <FormControl classes={{ root: classes.input }}>
                <TextField
                    id="standard-adornment-password-confirmation"
                    label="Confirm password"
                    type={showPassword ? 'text' : 'password'}
                    value={formValues.passwordConfirmation}
                    onChange={handleChange('passwordConfirmation')}
                    className={classes.underlinedInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    classes={{ root: classes.iconButton }}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formErrors.passwordConfirmation)}
                    helperText={l(formErrors.passwordConfirmation)}
                />
            </FormControl>
            <span className={classes.descriptionSecondary}>
                Your password must be at least 8 characters long, be of mixed case and also contain a digit or symbol.
            </span>
            <a className={classes.link} onClick={generateRandomPassword}>Generate a strong password</a>
        </div>
    );
};
