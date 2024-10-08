import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className='loadingSpinnerContainer' data-testid='spin-container'>
      <div className='loadingSpinner' data-testid='inner-container'></div>
    </div>
  );
};
export default Spinner;
