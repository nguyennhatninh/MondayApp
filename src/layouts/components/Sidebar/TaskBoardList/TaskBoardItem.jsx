import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { NavLink } from 'react-router-dom';
import images from '~/assets/images';
import styles from './TaskBoardList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteTaskBoard, editTaskBoard } from '~/redux/actions';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function TaskBoardItem({ children, icon, space, hover, large, to, index, noLink }) {
    const [inputTaskBoard, setinputTaskBoard] = useState(false);
    const [valueTaskBoardInput, setValueTaskBoardInput] = useState(children);
    const [render, setRender] = useState(false);
    const taskBoardInput = useRef();

    const dispatch = useDispatch();

    const handleDeleteTaskBoard = () => {
        dispatch(deleteTaskBoard(index));
        localStorage.removeItem(`tables${index}`);
    };

    const handleSwapInput = () => {
        setinputTaskBoard(true);
        setRender(false);
        setTimeout(() => {
            taskBoardInput.current.focus();
        }, 0);
    };
    const handleEditTaskBoard = () => {
        setinputTaskBoard(false);
        setRender(false);
        dispatch(
            editTaskBoard({
                index: index,
                value: taskBoardInput.current.value,
            }),
        );
    };
    const renderTaskBoardEdit = () => (
        <div className={cx('edit-board')}>
            <div className={cx('edit-board-item')} onClick={handleSwapInput}>
                <FontAwesomeIcon icon={faPenToSquare} />
                Rename Task Board
            </div>
            <div className={cx('edit-board-item')} onClick={handleDeleteTaskBoard}>
                <FontAwesomeIcon icon={faTrashCan} />
                Delete
            </div>
        </div>
    );
    const handleNavLinkClick = (event) => {
        if (
            event.target.className === cx('icon') ||
            event.target.className === cx('edit-board-item') ||
            event.target.value === valueTaskBoardInput
        ) {
            event.preventDefault();
        }
    };
    return (
        <div className={cx('task-board', { space }, { hover })}>
            {!noLink ? (
                <NavLink
                    className={(nav) => cx('task-board-item', { active: nav.isActive }, { to })}
                    to={to}
                    onClick={handleNavLinkClick}
                    onBlur={() => setRender(false)}
                >
                    <Tippy content="This board is public, visible to all team members.">
                        <img className={cx('board-item-icon', { large })} src={images.publicBoardIcon} alt="" />
                    </Tippy>
                    <span className={cx('board-item-title', { large })}>
                        {inputTaskBoard ? (
                            <input
                                ref={taskBoardInput}
                                value={valueTaskBoardInput}
                                onChange={(e) => setValueTaskBoardInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleEditTaskBoard()}
                                onBlur={handleEditTaskBoard}
                            />
                        ) : (
                            children
                        )}
                        {icon && (
                            <HeadlessTippy visible={render} interactive render={renderTaskBoardEdit} placement="top">
                                <img className={cx('icon')} src={icon} alt="" onClick={() => setRender(true)} />
                            </HeadlessTippy>
                        )}
                    </span>
                </NavLink>
            ) : (
                <div className={cx('task-board-item')}>
                    <Tippy content="This board is public, visible to all team members.">
                        <img className={cx('board-item-icon', { large })} src={images.publicBoardIcon} alt="" />
                    </Tippy>
                    <span className={cx('board-item-title', { large })}>
                        {children}
                        <img className={cx('icon')} src={images.favouriteIcon} alt="" />
                    </span>
                </div>
            )}
        </div>
    );
}

export default TaskBoardItem;
