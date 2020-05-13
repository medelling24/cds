import {COLOR} from './styleGuide';

export const noRisk = `
Por el momento no tienes riesgo de haberte expuesto, ni síntomas relacionados a COVID-19. 

En caso de tener algún síntoma vuelve a contestar el test.  

Recomendaciones:
 
● Quédate en tu casa y no salgas 
● Lávate muy bien las manos frecuentemente con agua y jabón 
● Usa alcohol en gel al 70% cuando no haya agua
● Mantén una distancia mínima de 3 metros de persona a persona,
especialmente si tosen, estornudan o tienen fiebre
● Evita tocarte los ojos, la nariz y la boca con las manos
● Al toser o estornudar cúbrete con el hueco del codo
● Limpia y desinfecta frecuentemente las superficies de uso común
● Antes de entrar a tu casa, limpia la suela de tus zapatos y desinfecta todo lo que traigas de la calle.

Para más información te invitamos a visitar este sitio: https://coronavirus.gob.mx/

Número de emergencia 800 123 8888 (Línea exclusiva de atención COVID-19 Servicios de Salud SLP)

Si tienes preguntas adicionales contáctanos: covid19.uaslp@gmail.com

Número para asesorías en salud 444 168 6161 (Centro de Información y Atención Toxicológica S.L.P)`;
export const lowRisk = `
Por el momento tienes riesgo bajo, has estado expuesto, pero no tienes síntomas relacionados a COVID-19.

Permanece en cuarentena de 14 días.

En caso de tener algún síntoma vuelve a contestar el test inmediatamente.

Recomendaciones:
● Quédate en tu casa y no salgas (estás en cuarentena)
● Lávate muy bien las manos frecuentemente con agua y jabón
● Usa alcohol en gel al 70% cuando no haya agua
● Mantén una distancia mínima de 3 metros de persona a persona,
especialmente si tosen, estornudan o tienen fiebre
● Evita tocarte los ojos, la nariz y la boca con las manos
● Al toser o estornudar cúbrete con el hueco del codo
● Limpia y desinfecta frecuentemente las superficies de uso común
● Antes de entrar a tu casa, limpia la suela de tus zapatos y desinfecta todo lo que traigas de la calle

Para más información te invitamos a visitar este sitio: https://coronavirus.gob.mx/

Número de emergencia 800 123 8888 (Línea exclusiva de atención COVID-19 Servicios de Salud SLP)

Si tienes preguntas adicionales contáctanos: covid19.uaslp@gmail.com

Número para asesorías en salud 444 168 6161 (Centro de Información y Atención Toxicológica S.L.P).
`;
export const mediumRisk = `
De acuerdo con tus respuestas, tienes riesgo medio de padecer COVID-19.
Permanece en aislamiento en casa durante 14 a 21 días, revisando tus síntomas varias veces al día.

Revisa el manual para el manejo del aislamiento doméstico y sigue sus recomendaciones estrictamente

Revisa el manual para el manejo del aislamiento doméstico disponible en el link de abajo.

Si tus síntomas empeoran, ponte en contacto con un médico.

Para más información te invitamos a visitar este sitio: https://coronavirus.gob.mx/

Número de emergencia 800 123 8888 (Línea exclusiva de atención COVID-19 Servicios de Salud SLP).

Si tienes preguntas adicionales contáctanos: covid19.uaslp@gmail.com

Número para asesorías en salud 444 168 6161 (Centro de Información y Atención Toxicológica S.L.P).
`;
export const highRisk = `
De acuerdo con tus respuestas, tienes alto riesgo de padecer COVID-19. Por lo cual, tienes que buscar asistencia médica inmediata.

Si tienes que ir a un centro de salud, por favor evita posibles contagios utilizando un tapabocas y cuida de mantener 3 metros de distancia de las demás personas.

Permanece en aislamiento en tu casa siguiendo las recomendaciones que te proporcione el médico.

Revisa el manual para el manejo del aislamiento doméstico disponible en él link de abajo.

Para más información te invitamos a visitar este sitio: https://coronavirus.gob.mx/

Número de emergencia 800 123 8888 (Línea exclusiva de atención COVID-19 Servicios de Salud SLP).

Si tienes preguntas adicionales contáctanos: covid19.uaslp@gmail.com

Número para asesorías en salud 444 168 6161 (Centro de Información y Atención Toxicológica S.L.P).
`;
export const severeRisk = `
De acuerdo con tus respuestas, tienes alto riesgo de padecer COVID-19 y además presentas factores de riesgo para la enfermedad. Por lo cual tienes que buscar asistencia médica inmediata.

Si tienes que ir a un centro de salud, por favor evita posibles contagios utilizando un tapabocas y cuida de mantener 3 metros de distancia de las demás personas.

Permanece en aislamiento en tu casa siguiendo las recomendaciones que te proporcione el médico.

Revisa el manual para el manejo del aislamiento doméstico disponible en el link de abajo.

Para más información te invitamos a visitar este sitio: https://coronavirus.gob.mx/

Número de emergencia 800 123 8888 (Línea exclusiva de atención COVID-19 Servicios de Salud SLP).

Si tienes preguntas adicionales contáctanos: covid19.uaslp@gmail.com

Número para asesorías en salud 444 168 6161 (Centro de Información y Atención Toxicológica S.L.P).
`;
export const respiratoryRisk = `
De acuerdo con tus respuestas, tienes síntomas que requieren atención médica para definir su causa, se te recomienda hacerlo de inmediato.

Para más información te invitamos a visitar este sitio: https://coronavirus.gob.mx/

Número de emergencia 800 123 8888 (Línea exclusiva de atención COVID-19 Servicios de Salud SLP).

Si tienes preguntas adicionales contáctanos: covid19.uaslp@gmail.com

Número para asesorías en salud 444 168 6161 (Centro de Información y Atención Toxicológica S.L.P).
`;


export const riskScale = [
  {
    title: 'Sin Riesgo',
    color: COLOR.GREEN_COLOR,
    recommendationsText: `
Por el momento no tienes riesgo de haberte expuesto, ni síntomas relacionados a COVID-19. 

En caso de tener algún síntoma vuelve a contestar el test.
    `,
  },
  {
    title: 'Riesgo Bajo',
    color: COLOR.YELLOW,
    recommendationsText: `
Por el momento tienes riesgo bajo, has estado expuesto, pero no tienes síntomas relacionados a COVID-19.

Permanece en cuarentena de 14 días.

En caso de tener algún síntoma vuelve a contestar el test inmediatamente.
    `,
  },
  {
    title: 'Riesgo Medio',
    color: COLOR.ORANGE,
    recommendationsText: `
De acuerdo con tus respuestas, tienes riesgo medio de padecer COVID-19.
Permanece en aislamiento en casa durante 14 a 21 días, revisando tus síntomas varias veces al día.

Revisa el manual para el manejo del aislamiento doméstico y sigue sus recomendaciones estrictamente
    
Si tus síntomas empeoran, ponte en contacto con un médico.
    `,
  },
  {
    title: 'Riesgo Alto',
    color: COLOR.RED,
    recommendationsText: `De acuerdo con tus respuestas, tienes alto riesgo de padecer COVID-19. Por lo cual, tienes que buscar asistencia médica inmediata.

Si tienes que ir a un centro de salud, por favor evita posibles contagios utilizando un tapabocas y cuida de mantener 3 metros de distancia de las demás personas.
    
Permanece en aislamiento en tu casa siguiendo las recomendaciones que te proporcione el médico.
    `,
  },
  {
    title: 'Riesgo Grave',
    color: COLOR.BROWN,
    recommendationsText: `De acuerdo con tus respuestas, tienes alto riesgo de padecer COVID-19 y además presentas factores de riesgo para la enfermedad. Por lo cual tienes que buscar asistencia médica inmediata.

Si tienes que ir a un centro de salud, por favor evita posibles contagios utilizando un tapabocas y cuida de mantener 3 metros de distancia de las demás personas.
    
Permanece en aislamiento en tu casa siguiendo las recomendaciones que te proporcione el médico.
    
Revisa el manual para el manejo del aislamiento doméstico.
    `,
  },
  {
    title: 'Riesgo Respiratorio',
    color: COLOR.PURPLE,
    recommendationsText: `De acuerdo con tus respuestas, tienes síntomas que requieren atención médica para definir su causa, se te recomienda hacerlo de inmediato.
    `,
  },
];
