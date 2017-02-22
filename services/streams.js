import defaultConfig from '../config/default'
import superagent from 'superagent'
import streamsConfig from '../config/streams'

export default function (params, cb) {
  let url = `${defaultConfig.API_URL}${streamsConfig.url}`
  let index = 0
  for (let param of streamsConfig.url_params) {
    if (param.useParams && params[param.key]) {
      index === 0 ? url += '?' : url += '&'
      url += `${param.key}`
      index++
    } else if (param.value) {
      index === 0 ? url += '?' : url += '&'
      url += `${param.key}=${param.value}`
      index++
    }
  }
  console.log(url)
  superagent
    .get(url)
    .set('Client-ID', defaultConfig.CLIENT_ID)
    .set('Accept', 'application/vnd.twitchtv.v5+json')
    .end((err, res) => {
      if (err) throw (err)
      console.log(res.body)
      let data = res && res.body && res.body.streams ? res.body.streams : []
      console.log({data})
      cb && cb(data)
    })
}
