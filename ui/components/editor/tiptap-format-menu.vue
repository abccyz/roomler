<template>
  <editor-menu-bar v-if="!minimal" :id="`${elemId}-format-menu`" v-slot="{ commands, isActive }" :editor="editor">
    <v-container class="pl-0 pr-0 ml-0 mr-0">
      <v-layout class="pl-0 pr-0 ml-0 mr-0 d-flex flex-row flex-wrap justify-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              outlined
              tile
              small

              v-on="on"
              @click="commands.undo"
            >
              <v-icon small>
                fa-undo
              </v-icon>
            </v-btn>
          </template>
          <span>Undo</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              outlined
              tile
              small

              v-on="on"
              @click="commands.redo"
            >
              <v-icon small>
                fa-redo
              </v-icon>
            </v-btn>
          </template>
          <span>Redo</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.bold()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.bold"
            >
              <v-icon small>
                fa-bold
              </v-icon>
            </v-btn>
          </template>
          <span>Bold</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.italic()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.italic"
            >
              <v-icon small>
                fa-italic
              </v-icon>
            </v-btn>
          </template>
          <span>Italic</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.strike()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.strike"
            >
              <v-icon small>
                fa-strikethrough
              </v-icon>
            </v-btn>
          </template>
          <span>Strike-through</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.underline()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.underline"
            >
              <v-icon small>
                fa-underline
              </v-icon>
            </v-btn>
          </template>
          <span>Underline</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.paragraph()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.paragraph"
            >
              <v-icon small>
                fa-paragraph
              </v-icon>
            </v-btn>
          </template>
          <span>Paragraph</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.heading({ level: 1 })"
              outlined
              tile
              small

              v-on="on"
              @click="commands.heading({ level: 1 })"
            >
              H1
            </v-btn>
          </template>
          <span>Heading 1</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.heading({ level: 2 })"
              outlined
              tile
              small

              v-on="on"
              @click="commands.heading({ level: 2 })"
            >
              H2
            </v-btn>
          </template>
          <span>Heading 2</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.heading({ level: 3 })"
              outlined
              tile
              small

              v-on="on"
              @click="commands.heading({ level: 3 })"
            >
              H3
            </v-btn>
          </template>
          <span>Heading 3</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.bullet_list()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.bullet_list"
            >
              <v-icon small>
                fa-list-ul
              </v-icon>
            </v-btn>
          </template>
          <span>Bullet list</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.ordered_list()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.ordered_list"
            >
              <v-icon small>
                fa-list-ol
              </v-icon>
            </v-btn>
          </template>
          <span>Ordered list</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.todo_list()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.todo_list"
            >
              <v-icon small>
                fa-check-square
              </v-icon>
            </v-btn>
          </template>
          <span>Todo</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.blockquote()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.blockquote"
            >
              <v-icon small>
                fa-quote-right
              </v-icon>
            </v-btn>
          </template>
          <span>Quote</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.code_block()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.code_block"
            >
              <v-icon small>
                fa-code
              </v-icon>
            </v-btn>
          </template>
          <span>Code</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.image()"
              outlined
              tile
              small

              v-on="on"
              @click="attach(commands, 'image')"
            >
              <v-icon small>
                fa-image
              </v-icon>
            </v-btn>
          </template>
          <span>Insert image</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.file()"
              outlined
              tile
              small

              v-on="on"
              @click="attach(commands, 'file')"
            >
              <v-icon small>
                fa-paperclip
              </v-icon>
            </v-btn>
          </template>
          <span>Attach files</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="isActive.table()"
              outlined
              tile
              small

              v-on="on"
              @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
            >
              <v-icon small>
                fa-table
              </v-icon>
            </v-btn>
          </template>
          <span>Table</span>
        </v-tooltip>

        <template
          v-if="isActive.table()"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.deleteTable"
              >
                <v-icon small>
                  fa-trash
                </v-icon>
              </v-btn>
            </template>
            <span>Remove table</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.addColumnBefore"
              >
                +|
              </v-btn>
            </template>
            <span>Add column before</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.addColumnAfter"
              >
                |+
              </v-btn>
            </template>
            <span>Add column after</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.deleteColumn"
              >
                |x|
              </v-btn>
            </template>
            <span>Delete column</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.addRowBefore"
              >
                +_
              </v-btn>
            </template>
            <span>Add row before</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.addRowAfter"
              >
                _+
              </v-btn>
            </template>
            <span>Add row after</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.deleteRow"
              >
                _x_
              </v-btn>
            </template>
            <span>Delete row</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                small

                v-on="on"
                @click="commands.toggleCellMerge"
              >
                <v-icon small>
                  fa-object-group
                </v-icon>
              </v-btn>
            </template>
            <span>Merge cells</span>
          </v-tooltip>
        </template>
      </v-layout>
    </v-container>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'

export default {
  components: {
    EditorMenuBar
  },
  props: {
    elemId: {
      type: String,
      default: ''
    },
    editor: {
      type: Object,
      default: null
    },
    minimal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: true,
      sub_menu: true
    }
  },
  methods: {
    attach (comms, attachType) {
      this.$emit('attach', comms, attachType)
    }
  }
}
</script>
