import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

class CowinDashboard extends Component {
  state = {chartsData: {}, pageStatus: ''}

  vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

  componentDidMount() {
    this.getChartData()
  }

  getChartData = async () => {
    this.setState({pageStatus: 'Loading'})
    const options = {method: 'GET'}
    const response = await fetch(this.vaccinationDataApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({pageStatus: 'Success'})
      const lastSevenDayVaccination = data.last_7_days_vaccination.map(
        each => ({
          dose1: each.dose_1,
          dose2: each.dose_2,
          vaccineDate: each.vaccine_date,
        }),
      )
      const vaccinationByAge = data.vaccination_by_age
      const vaccinationByGender = data.vaccination_by_gender
      const vaccineSurveyList = {
        lastSevenDayVaccination,
        vaccinationByAge,
        vaccinationByGender,
      }
      this.setState({chartsData: vaccineSurveyList})
      console.log(data)
    } else {
      this.setState({pageStatus: 'Failure'})
    }
  }

  render() {
    const {pageStatus, chartsData} = this.state
    const {
      lastSevenDayVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = chartsData
    return (
      <div className="back">
        <div className="logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="im1"
          />
          <h1 className="win">Co-WIN</h1>
        </div>
        <h1 className="h12">CoWIN Vaccination in India</h1>
        <br />
        <div>
          <h1 className="h12">Vaccination Coverage</h1>
          <div>
            {pageStatus === 'Loading' && (
              <div data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height={80}
                  width={80}
                />
              </div>
            )}
            {pageStatus === 'Success' && (
              <div>
                <div>
                  <VaccinationCoverage details={lastSevenDayVaccination} />
                </div>
                <br />
                <h1 className="h12">Vaccination by gender</h1>
                <div>
                  <VaccinationByGender genderDetails={vaccinationByGender} />
                </div>
                <br />
                <h1 className="h12">Vaccination by age</h1>
                <div>
                  <VaccinationByAge ageDetails={vaccinationByAge} />
                </div>
              </div>
            )}
            {pageStatus === 'Failure' && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                  alt="failure view"
                />
                <h1 className="h12">Something went wrong</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default CowinDashboard
