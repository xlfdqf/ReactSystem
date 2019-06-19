import PropTypes from  "prop-types";
import classNames from 'classnames';
import styles from "./back.less";
const Back =({title,className,onClick})=>{
    return (
        <div className={classNames(className,styles.back)} onClick={onClick}>
            {title}
        </div>
    )
}
Back.defaultProps={
    title:'Back',
}
Back.propTypes={
    title:PropTypes.string,
};
export default Back