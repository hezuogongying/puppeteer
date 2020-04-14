/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {assert} = require('./helper');

class Dialog {

  private _client: Puppeteer.CDPSession;
  private _type: string
  private _message: string
  private _defaultValue: string

  private _handled: boolean = false;

  static Type = {
    Alert: 'alert',
    BeforeUnload: 'beforeunload',
    Confirm: 'confirm',
    Prompt: 'prompt'
  }

  constructor(client: Puppeteer.CDPSession, type: string, message: string, defaultValue: string = '') {
    this._client = client;
    this._type = type;
    this._message = message;
    this._defaultValue = defaultValue;
  }

  type() {
    return this._type;
  }

  message() {
    return this._message;
  }

  defaultValue() {
    return this._defaultValue;
  }

  async accept(promptText?: string) {
    assert(!this._handled, 'Cannot accept dialog which is already handled!');
    this._handled = true;
    await this._client.send('Page.handleJavaScriptDialog', {
      accept: true,
      promptText: promptText
    });
  }

  async dismiss() {
    assert(!this._handled, 'Cannot dismiss dialog which is already handled!');
    this._handled = true;
    await this._client.send('Page.handleJavaScriptDialog', {
      accept: false
    });
  }
}

export = Dialog
