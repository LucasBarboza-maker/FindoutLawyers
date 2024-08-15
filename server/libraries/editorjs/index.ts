import { IEditorJSParser_Args } from '@/types/libraries/TypesEditorJSParser';
import { UtilsObject } from '../utils';
import { EDITOR_JS_DEFAULT_CONFIGS } from './configs';
import { EDITOR_JS_DEFAULT_EMBED_MARKUPS } from './embedMarkups';
import * as Parsers from './parsers';

/*
:--------------------------------------------------------------------------
: EditorJS Parser output data into html
:--------------------------------------------------------------------------
*/

export class EditorJSParser {
   _input: Record<string, any>;
   _output: string;
   _config: Record<any, any>;
   _embeds: Record<any, any>;
   _customs: Record<any, any>;
   _parsers: Record<any, any>;

   constructor({
      embeds = {},
      customs = {},
      config = {},
   }: IEditorJSParser_Args) {
      this._input = {};
      this._output = '';
      this._embeds = embeds;
      this._config = UtilsObject.mergeDeep(EDITOR_JS_DEFAULT_CONFIGS, config);
      this._config.embedMarkups = Object.assign(
         EDITOR_JS_DEFAULT_EMBED_MARKUPS,
         embeds
      );
      this._customs = {};
      this._parsers = Object.assign(Parsers, customs);
   }

   parse(outputData): string {
      const html = outputData.blocks.map((block) => {
         const markup = this.parseBlock(block);
         if (markup instanceof Error) {
            return ''; // parser for this kind of block doesn't exist
         }
         return markup;
      });
      return html.join('');
   }

   parseBlock(block): Error | unknown {
      if (!this._parsers[block.type]) {
         return new Error(
            `${block.type} is not supported! Define your own custom function.`
         );
      }
      try {
         return this._parsers[block.type](block.data, this._config);
      } catch (err) {
         return err;
      }
   }
}
