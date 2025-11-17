'use client'

import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
  }

  return (
    <div id="block-newsletter" className="footer-newsletter">
      <h4>Newsletter Subscription</h4>
      
      <form 
        className="webform-submission-form webform-submission-add-form webform-submission-newsletter-subscription-form webform-submission-newsletter-subscription-add-form webform-submission-newsletter-subscription-node-6-form webform-submission-newsletter-subscription-node-6-add-form js-webform-details-toggle webform-details-toggle"
        onSubmit={handleSubmit}
      >
        <div className="js-webform-type-email webform-type-email js-form-item form-item js-form-type-email form-item-email-address js-form-item-email-address">
          <label htmlFor="edit-email-address" className="js-form-required form-required">
            Email Address :
          </label>
          <input
            type="email"
            id="edit-email-address"
            name="email_address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={60}
            maxLength={254}
            placeholder="Email Address"
            className="form-email"
            required
          />
        </div>

        <div id="edit-markup" className="js-webform-type-webform-markup webform-type-webform-markup js-form-item form-item js-form-type-webform-markup form-item-markup js-form-item-markup form-no-label">
          <p>By clicking Subscribe, I am requesting that ZXY International send me newsletters and updates to this email address. I agree to the <a href="https://zxyrnd.digital/privacy-policy">Privacy Policy</a> &amp; <a href="https://zxyrnd.digital/cookie-policy">Cookie Policy</a>.</p>
        </div>

        <div data-drupal-selector="edit-actions" className="form-actions webform-actions js-form-wrapper form-wrapper" id="edit-actions">
          <input 
            className="webform-button--submit button button--primary js-form-submit form-submit"
            type="submit" 
            value="Subscribe"
          />
        </div>
      </form>
    </div>
  )
}

export default Newsletter