import * as Path from 'path'
import * as FS from 'fs'
import * as Koa from 'koa'
import { Context } from 'koa'
import * as Puppeteer from 'puppeteer'

const url = 'https://www.baidu.com/'

const _DEV_ = process.env.NODE_ENV === 'development'

class Application {
	private app: Koa = new Koa()
	
	constructor(){
		// this.app = new Koa()
		this.init()
	}

	private init(){

		this.app.keys = ['APP_Keys']; // set app keys
		this.app.use(async (ctx: Context, next: () => Promise<any>) => {
			const path = ctx.request.path
			console.log(`path: ${path}`, __dirname)
			if(path === '/') {
				ctx.body = 'Welcome to node-pdf server.'
      }
      if(path === '/pdf') {
        const url = 'https://www.baidu.com' // 'file:' + Path.join(__dirname, './template.html')
        const browser = await Puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.pdf({path: 'baidu.pdf', format: 'A4'});
        await browser.close();
				ctx.body = {
          code: 200,
          data: {
            path: 'file.filename'
          },
          msg: 'success'
        }
			}
			await next()
      ctx.set('X-Powered-By', 'xpioneer');
		})
  }

	// start app
	public start(port: number) {
		this.app.listen(port, (): void => {
			console.log(`Koa server has started, running with: http://127.0.0.1:${port}.\n`)
		})
	}
}

export default new Application()