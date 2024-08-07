import style from './breadcrumbs.module.css';
import Icon from '../Icon/Index';

const BreadCrumbs = ({ crumbs }) => {
	const renderCrumb = (crumb) => (
		<>
			{crumb.url ? (
				<li className={`${style.crumbSection}`} key={crumb.label}>
					<a href={crumb.url} className={`${style.crumbLink}`}>
						{crumb.label}
					</a>
					<span className={`${style.crumbSeparator}`}>
						<Icon id="#arrowRight" className={`${style.arrowRight__icon}`} />{" "}
					</span>
				</li>
			) : (
				<li className={`${style.crumbСurrent}`} key={crumb.label}>{crumb.label}</li>
			)}
		</>
	);

	return (
		<ul className={`${style.breadCrumbs}`}>
			{crumbs.length && crumbs.map(renderCrumb)}
		</ul>
	);
};

export default BreadCrumbs;
