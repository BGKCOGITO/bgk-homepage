# Google Ads tracking update

- Google Ads base tag installed: `AW-18396552865`
- Tag scope: entire BGK website (`app/layout.tsx`)
- WORKCRAFT quote success event prepared: `workcraft_quote_generated`
- WORKCRAFT field-diagnosis success event prepared: `workcraft_field_diagnosis_submitted`

The two WORKCRAFT events fire only at their actual success points. Google Ads conversion labels have not been issued yet, so no fake `send_to` conversion label has been added. After Google Ads provides the conversion label(s), connect them to these exact event points.


## 2026-08-18 Google Ads lead conversion
- Conversion ID: AW-18396552865
- Conversion label: am5wCN6J1eMcEKG91MRE
- send_to: AW-18396552865/am5wCN6J1eMcEKG91MRE
- Fires only after `/api/business-inquiry` returns success.
- Uses quote ID as transaction_id to reduce accidental duplicate conversion reporting.
