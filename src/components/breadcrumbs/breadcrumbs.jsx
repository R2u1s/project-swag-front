import style from './breadcrumbs.module.css';
import Icon from '../Icon/Index';

const BreadCrumbs = ({ crumbs }) => {
	return (
			<ul className={`${style.breadCrumbs}`}>
					{crumbs.length > 0 && crumbs.map((crumb, index) => {
							return (
									<li key={index} className={crumb.url ? `${style.crumbSection}` : `${style.crumbСurrent}`}>
											{crumb.url ? (
													<>
															<a href={crumb.url} className={`${style.crumbLink}`}>
																	{crumb.label}
															</a>
															{index < crumbs.length - 1 && <span className={`${style.crumbSeparator}`}>
																	<Icon id="#arrowRight" className={`${style.arrowRight__icon}`} />{" "}
															</span>}
													</>
											) : (
													crumb.label
											)}
									</li>
							);
					})}
			</ul>
	);
};
export default BreadCrumbs;
