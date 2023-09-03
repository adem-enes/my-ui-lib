import React, { ReactElement, cloneElement, isValidElement } from 'react'
import style from './Form.module.css';
import { FormProps } from './index'

const Form = ({ children, onSubmit, onReset, hasBorder = true, ...props }: FormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can perform any form submission logic here
        if (onSubmit) {
            onSubmit();
        }
    };

    const resetForm = () => {
        if (onReset) {
            onReset();
        }
    };
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            if (isValidElement(child)) {
                return cloneElement(child as ReactElement<any>, {
                    ...child.props,
                });
            }
            return child; // Non-element children are passed through as-is
        });
    };

    // Check if there are custom submit and reset buttons provided by the developer
    const hasCustomButtons = React.Children.toArray(children).some((child) => {
        if (isValidElement(child)) {
            const { type } = child.props;
            return type === 'submit' || type === 'reset';
        }
        return false;
    });

    return (
        <form onSubmit={handleSubmit} onReset={resetForm} {...props}
            className={`${style['form-container']} ${hasBorder ? style['form-has-border'] : ''}`}>
            {renderChildren()}
            {!hasCustomButtons && (
                <div className={style['form-buttons']}>
                    <input type="submit" value={"Submit"} />
                    <input type="reset" value={"Reset"} />
                </div>
            )}
        </form>
    )
}

export default Form;