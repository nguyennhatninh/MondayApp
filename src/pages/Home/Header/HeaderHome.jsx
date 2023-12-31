import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import styles from './HeaderHome.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function HeaderHome() {
    return (
        <div className={cx('home-header')}>
            <div className={cx('home-header-intro')}>
                <div className={cx('home-header-content')}>
                    <div>
                        Good {'evening'}, {'Ninh'}!
                    </div>
                    <div>Quickly access your recent boards, Inbox and workspaces</div>
                </div>
                <img src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg" alt="" />
            </div>
            <div className={cx('home-header-btn')}>
                <div>
                    <FontAwesomeIcon className={cx('home-header-icon')} icon={faComment} />
                    Give feedback
                </div>
                <Button primary>
                    <FontAwesomeIcon className={cx('home-header-icon')} icon={faBolt} />
                    Quick Search
                </Button>
            </div>
        </div>
    );
}

export default HeaderHome;
