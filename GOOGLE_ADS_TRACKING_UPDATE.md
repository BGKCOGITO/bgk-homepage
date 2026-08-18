# Google Ads tracking update

- Google Ads base tag installed: `AW-18396552865`
- Tag scope: entire BGK website (`app/layout.tsx`)
- WORKCRAFT quote success event prepared: `workcraft_quote_generated`
- WORKCRAFT field-diagnosis success event prepared: `workcraft_field_diagnosis_submitted`

The two WORKCRAFT events fire only at their actual success points. Google Ads conversion labels have not been issued yet, so no fake `send_to` conversion label has been added. After Google Ads provides the conversion label(s), connect them to these exact event points.
